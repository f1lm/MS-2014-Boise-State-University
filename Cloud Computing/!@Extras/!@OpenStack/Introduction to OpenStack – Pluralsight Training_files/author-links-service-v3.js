"use strict";

pluralsightModule
    .factory("AuthorLinksService", function () {
        return {
            getAuthorLinks: function (authors, courseName) {
                if (!authors) return [];
                if (authors.length == 1) {
                    return [buildAuthorLinkWithFullName(authors[0])];
                } else if (authors.length == 2) {
                    return [buildAuthorLinkWithLastName(authors[0], ','), buildAuthorLinkWithLastName(authors[1])];
                }
                return [buildAuthorLinkWithFullName(authors[0], ','), buildEtAlAuthorLink(courseName)];
            }
        };

        function buildAuthorLinkWithLastName(author, delimiter) {
            return { name: author.lastName, href: '/author/' + author.handle, delimiter: delimiter };
        }

        function buildAuthorLinkWithFullName(author, delimiter) {
            return { name: author.firstName + ' ' + author.lastName, href: '/author/' + author.handle, delimiter: delimiter };
        }

        function buildEtAlAuthorLink(courseName) {
            return { name: 'et al.', href: '/courses/description/' + courseName };
        }
    });