"use strict";

pluralsightModule
    .controller("AssessmentPlayerController", ['$scope', '$routeParams', 'baseUrls', '$interval', 'PlayerService', 'AssessmentRepository', '$sce', '$location', '$window',
        function ($scope, $routeParams, baseUrls, $interval, playerService, assessmentRepository, $sce, $location, $window) {
            $scope.clearTabs();
            $scope.tabClasses.assessment = "active";

            if (!$location.search().id) {
                redirectToAssessmentPage();
                return;
            }

            var assessmentId = $location.search().id;

            assessmentRepository.getAssessmentById(assessmentId).$promise.then(function (assessment) {
                if (!assessment.currentQuestion) {
                    redirectToAssessmentPage();
                    return;
                }

                $scope.assessment = assessment;

                if (assessment.timeRemaining.isTimedOut) {
                    endAssessment();
                    return;
                }

                $scope.assessment.timer = buildDateFromTimeRemaining(assessment.timeRemaining);
                $scope.question = assessment.currentQuestion;

                initializeFirstQuestion(assessment);
            }, function() {
                redirectToAssessmentPage();
            });

            function initializeFirstQuestion(assessment) {
                if (assessment.currentQuestion.questionKey) {
                    $scope.question.relatedClipUrl = baseUrls.mainWebUrl + "/player?" + assessment.currentQuestion.questionKey.playerUrl;
                    $scope.question.wasAnsweredCorrectly = $scope.question.questionKey.isSelectedAnswerCorrect;
                }

                var selectedAnswer = _.findWhere($scope.question.answers, { isSelected: true });
                $scope.question.selectedAnswer = selectedAnswer
                    ? selectedAnswer.index
                    : undefined;

                $scope.question.answered = $scope.question.isQuestionFinished;

                $scope.question.feedback = {};
                initializeQuestion();
            }

            function redirectToAssessmentPage() {
                $location.path('assessment/' + $routeParams.courseName);
            }

            $scope.meterStyle = function () {
                return $scope.assessment && $scope.question ? { width: (100 * ($scope.question.index + 1) / $scope.assessment.totalQuestions) + '%' } : '';
            };

            $scope.submitAnswer = function (selectedAnswer) {
                if (selectedAnswer === undefined) return;

                submitAnswer(selectedAnswer);
            };

            $scope.nextQuestion = function () {
                assessmentRepository.submitFeedbackAndAdvance(assessmentId, $scope.question.feedback.vote, $scope.question.feedback.comment).$promise.then(function (response) {
                    if (!response.succeeded) {
                        redirectToAssessmentPage();
                        return;
                    }

                    $scope.question = response.question;
                    initializeQuestion();
                }, function () {
                    redirectToAssessmentPage();
                });
            };

            function initializeQuestion() {
                $scope.question.timer = buildDateFromTimeRemaining($scope.question.timeRemaining);
                $scope.question.text = $sce.trustAsHtml($scope.question.text);
                angular.forEach($scope.question.answers, function (answer) {
                    answer.text = $sce.trustAsHtml(answer.text);
                });
            }

            $scope.answerClass = function (wasAnsweredCorrectly, selectedAnswer, answerNumber) {
                if (selectedAnswer !== answerNumber) return '';

                return wasAnsweredCorrectly
                    ? 'correct selected'
                    : 'incorrect selected';
            };

            $scope.saveFeedback = function (feedback) {
                feedback.submitted = true;
            };

            function buildDateFromTimeRemaining(duration) {
                return new Date(2000, 0, 1, duration.hours, duration.minutes, duration.seconds, 0);
            }

            var timerPromise = $interval(function () {
                if ($scope.assessment && timeRemaining($scope.assessment.timer)) {
                    $scope.assessment.timer = decrementTimer($scope.assessment.timer);
                    endAssessment();
                }
                if ($scope.question && timeRemaining($scope.question.timer)) {
                    $scope.question.timer = decrementTimer($scope.question.timer);
                    autoSubmit();
                }
            }, 1000);

            function decrementTimer(timer) {
                return new Date(timer.valueOf() - 1000);
            }

            function timeRemaining(timer) {
                return timer && (timer.getMinutes() != 0 || timer.getSeconds() != 0);
            }

            function endAssessment() {
                if (!timeRemaining($scope.assessment.timer)) {
                    $scope.assessment = assessmentRepository.getAssessmentById(assessmentId);
                    $scope.finished = true;
                    $interval.cancel(timerPromise);
                }
            }

            $scope.viewExplanation = function () {
                var clip = $scope.question.relatedClip;

                if (clip) {
                    playerService.openPlayer(clip.author, clip.module, clip.clipIndex, clip.course);
                } else if ($scope.question.relatedClipUrl) {
                    playerService.openPlayerUrl($scope.question.relatedClipUrl);
                }
            };

            $scope.likeQuestion = function () {
                $scope.question.feedback.vote = $scope.question.feedback.vote == 'Up' ? '' : 'Up';
            };

            $scope.dislikeQuestion = function () {
                $scope.question.feedback.vote = $scope.question.feedback.vote == 'Down' ? '' : 'Down';
            };

            function autoSubmit() {
                if (!timeRemaining($scope.question.timer)) {
                    submitAnswer($scope.question.selectedAnswer);
                }
            }

            function submitAnswer(selectedAnswer) {
                assessmentRepository.submitAnswer(assessmentId, selectedAnswer).$promise.then(function (response) {
                    $scope.question.wasAnsweredCorrectly = response.wasAnsweredCorrectly;
                    $scope.question.relatedClip = response.relatedClip;

                    $scope.question.submissionError = false;
                    $scope.question.answered = true;
                }, function () {
                    $scope.question.submissionError = true;
                    $scope.question.answered = false;
                });
            };

            $scope.finishAssessment = function () {
                assessmentRepository.submitFeedbackAndAdvance(assessmentId, $scope.question.feedback.vote, $scope.question.feedback.comment).$promise.then(function () {
                    assessmentRepository.getAssessmentById(assessmentId).$promise.then(function (assessment) {
                        $scope.assessment = assessment;
                    })['finally'](function() {
                        $scope.finished = true;
                        $interval.cancel(timerPromise);
                    });
                });
            };

            $scope.submitAssessmentFeedback = function (feedback) {
                if (!feedback) {
                    redirectOnFinishedAssessment();
                    return;
                }
                
                assessmentRepository.submitAssessmentFeedback(assessmentId, feedback).$promise['finally'](function() {
                    redirectOnFinishedAssessment();
                });
            };

            function redirectOnFinishedAssessment() {
                if ($scope.assessment.assessmentIsSample) {
                    redirectToAssessmentPage();
                } else {
                    redirectToUserTranscriptPage();
                }
            };

            function redirectToUserTranscriptPage() {
                $window.location.href = '/transcript';
            };
        }
    ]);
