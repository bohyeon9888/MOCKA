create table members
(
    member_id         bigserial
        primary key,
    created_at        timestamp(6),
    is_deleted        boolean,
    modified_at       timestamp(6),
    member_email      varchar(255),
    member_nickname   varchar(255),
    member_profile    varchar(255),
    member_role       varchar(255),
    member_providerid varchar(255)
);

create table hash_keys
(
    hash_id  bigserial
        primary key,
    hash_key varchar(255),
    used     boolean
);

create table groups
(
    group_id   bigserial
        primary key,
    group_name varchar(255),
    group_uri  varchar(255),
    project_id bigint not null
        references projects
);

create table base_uris
(
    base_id     bigserial
        primary key,
    project_id  bigint,
    uri         varchar(255),
    created_at  timestamp(6),
    is_deleted  boolean,
    modified_at timestamp(6)
);

create table api_response
(
    id           bigserial
        primary key,
    data         jsonb,
    api_id       bigint not null
        constraint fksuwcfldj3546nln7d6mceikve
            references api_projects,
    array_size   integer,
    faker_locale varchar(255),
    faker_major  varchar(255),
    faker_sub    varchar(255),
    array_list   boolean,
    key          varchar(255),
    type         varchar(255)
);

create table api_request
(
    id           bigserial
        primary key,
    data         jsonb,
    faker_locale varchar(255),
    faker_major  varchar(255),
    faker_sub    varchar(255),
    key          varchar(255),
    type         varchar(255),
    api_id       bigint not null
        constraint fkofo73c6dqv191echv7ym64xgo
            references api_projects,
    array_list   boolean default false
);

create table api_projects
(
    api_id                bigserial
        primary key,
    api_method            varchar(255) not null,
    api_uri               ltree        not null,
    project_id            bigint       not null,
    api_response_is_array boolean,
    api_response_size     integer,
    api_uri_str           varchar(255),
    description           varchar(255),
    name                  varchar(255),
    group_id              bigint
        constraint fk1pdnya0v6bbrcod1ju8e6101y
            references groups
);

create table project_invitations
(
    project_invitations_id bigserial
        primary key,
    member_id              bigint
        constraint project_invitations_members_member_id_fk
            references members
            on update cascade on delete set null,
    project_id             bigint
        constraint project_invitations_projects_project_id_fk
            references projects
            on update cascade on delete set null,
    accepted               boolean,
    is_deleted             boolean,
    modified_at            timestamp(6),
    created_at             timestamp(6),
    project_role           varchar(30)
);

create table projects
(
    project_id         bigserial
        primary key,
    common_uri         varchar(255),
    hash_id            bigint,
    project_hash_key   varchar(255),
    project_name       varchar(255),
    project_visibility varchar(255),
    created_at         timestamp(6),
    is_deleted         boolean,
    modified_at        timestamp(6),
    hash_value         varchar(255),
    default_group_id   bigint
);


create table project_histories
(
    base_id      bigserial
        primary key,
    project_id   bigint,
    uri          varchar(255),
    created_at   timestamp(6),
    is_deleted   boolean,
    modified_at  timestamp(6),
    member_id    bigint not null,
    project_role varchar(255),
    recent_read  timestamp(6)
);

