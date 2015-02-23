select name, `avg_score` from
(select 
S.name 
, Avg(sc.score) as `avg_score` 
from 
Student S
, Score sc
, grade_event G
where
S.student_id = sc.student_id 
and
sc.event_id = G.event_id
and
G.category = 'Q'
group by S.student_id 
order by `avg_score`
limit 10 ) as temp order by `avg_score` desc;