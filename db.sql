--
-- PostgreSQL database dump
--

-- Dumped from database version 14.16 (Homebrew)
-- Dumped by pg_dump version 14.16 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: michael
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(100),
    iscomplete boolean DEFAULT false NOT NULL,
    userid integer
);


ALTER TABLE public.tasks OWNER TO michael;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO michael;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: michael
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(70) NOT NULL
);


ALTER TABLE public.users OWNER TO michael;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO michael;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY public.tasks (id, title, description, iscomplete, userid) FROM stdin;
2	task 1	this is a test task	f	2
10	test	123	f	1
12	123		t	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY public.users (id, username, password) FROM stdin;
1	Michael	michaeltest@example.com
2	test	test@example.com
3	Alex	$2b$10$xZw/er0tli5MIFDa0uluxui/cRKBJ711W8wtpTcXzZm.Df0LEyrQa
4	123	$2b$10$I.TXNQr0BPkKXk3DdaDu4uyCsBLSrrFW3mfhyH7w4MMBiVt5c/BUm
6	testaccount	$2b$10$dZvrlzNOhs/vOZeqVZO9.u18.tFE08z684e7AOfe9IF.Q/FanyZmC
9	12345	$2b$10$aF3Ezo/Eq/XMUQ3FPJcsh.xriq1xW2KCBHidxaItcpL732Nq3DPCG
10	account	$2b$10$2Lybf2NXFyWjApoMtoRteODYrWtn5RCjdcjVNXt7b2G2AEfFgMiTW
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('public.tasks_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: tasks tasks_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

