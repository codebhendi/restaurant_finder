For backend
1. Postgres for the database
    . user
        . id integer inrement primary key
        . email string unique not nullable
        . name string not nullable
        . password string not nullable (hashed password)
        . salt string not nullable (to decrypt password)
        . created_at timestamp not nullable default (time of creation)
        . role string not nullable default 'user'
        . is_activated boolean default false
    . coach
        . id integer increment primary key
        . user_id foreign key integer referencing user.id not nullable
        . working hours string not nullable (format 09:00 am to 01:00 pm, 02:00pm to 05:00 pm)
    . appointment
        . id integer increment primary key
        . created_at timestamp not nullable default (time of creation)
        . date of appointment date not nullable
        . start_time timestamp not nullable
        . user_id foreign key integer referencing user.id not nullable
        . coach_id foreign key integer referenceing uesr.id
        . end_time timestamp  not nullable
    - leave
        . id integer increment primary key
        . coach id foreign key integer referenceing uesr.id
        . dateofleave date not nullable

2. Node and express
    for creation of appointment
        . url: /appointment/create
        . method: post
        . request: { headers: { token_jwt: (will be used to obtain user details using middleware and jwt token), content-type: json}, body: { date_of_appoinment: '2020-05-01', start_time: '2020-05-01 15:00:00', end_time: '2020-05-01 15:30:00', coach_id: 54 } 
        . response: { appointment_id: 34 } { error: 'user is not authorized', 'field missing' }
        . query: insert into appoinment (date, start_time, end_time, user_id, coach_id) values('2020-05-01', '2020-05-01 15:00:00', '2020-05-01 15:30:00', 4, 54)
        . query: select partition by persion_id sum(incomes.amount) - partition by persion_id sum(expenses.amount) as value ,unique person_id
            from  persons
            innner join incomes on incomes.person_id=persons.id
            inner join expenses on .expenses.person_id=persons.id
            order by value desc

3. Redis for caching
4. Rabbit MQ for scheduling
5. React - front end
    1. User
        a. login
        b. signup
        c. appointment creation - for subsequent visits can see coach's calendar  / if the user is new then assign new coach
        d. appointment list previous and old
        e. incoming appointment edit
        f. edit profile - reset password
        g. forgot password flow
    2. Coach
6. Functionality to be added
    . coach creating appointments
    