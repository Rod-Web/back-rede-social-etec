create database dados_rede_social;
use dados_rede_social;
show tables;

-- Tabela das disciplinas escolares
create table disciplina (
	codigo									int											primary key not null,
    nome									varchar(50)									not null
);
insert into disciplina (codigo, nome) values
(1000, "Língua Portuguesa"),
(1001, "Matemática"),
(1002, "História"),
(1003, "Geografia"),
(1004, "Língua Inglesa"),
(1005, "Biologia"),
(1006, "Física"),
(1007, "Química");

-- Tabela dos contatos dos professores
create table contato_do_professor (
	codigo									int											primary key auto_increment,
    tipo									enum('telefone', 'email')					not null,
    valor									varchar(100)								not null
);


-- Tabela dos professores
create table professor (
	rf										int											primary key not null,
    nome 									varchar(150)								not null,
    senha									varchar(260)								not null,
    key_contato_professor					int											not null,
    
    foreign key (key_contato_professor) references contato_do_professor(codigo)
);


-- Tabela associativa entre professores e disciplinas permitindo os professores ensinar mais de uma disciplina e uma disciplina ter mais de um professor
create table professor_disciplina (
	id										int											auto_increment,
    carga_horaria							int											not null,
    ano_letivo								year										not null,

    key_professor							int											not null,
    key_disciplina							int											not null,
    
    primary key(id, key_professor, key_disciplina),
    
    foreign key(key_professor) references professor(rf),
    foreign key(key_disciplina) references disciplina(codigo)
);




-- Tabela das turmas escolares
create table turma (
	codigo									int											primary key not null,
    nome									varchar(50)									not null,
    ano										year										not null,
    serie									varchar(20)									not null,
    turno									enum('Manhã', 'Tarde', 'Noite')				not null,
	tipo_formacao 							enum('Técnico', 'Médio Integrado') 			not null
);
INSERT INTO turma (codigo, nome, ano, serie, turno, tipo_formacao) VALUES
(10000, 'Desenvolvimento de sistemas', 2025, '1º Ano', 'Manhã', 'Médio Integrado'),
(10001, 'Informática para internet', 2025, '2º Ano', 'Tarde', 'Médio Integrado'),
(10002, 'Administração', 2025, '3º módulo', 'Noite', 'Técnico'),
(10003, 'Administração', 2025, '1º módulo', 'Tarde', 'Técnico'),
(10004, 'Desenvolvimento de sistemas', 2025, '2º Ano', 'Manhã', 'Médio Integrado');


-- Tabela dos contatos dos alunos
create table contato_do_aluno (
	codigo									int											primary key auto_increment,
    tipo									enum('telefone', 'email')					not null,
    valor									varchar(100)								not null
);


-- Tabela dos alunos
create table aluno (
	rm										int											primary key not null,
    nome 									varchar(150)								not null,
    data_nascimento							date										not null,
    senha									varchar(260)								not null,
    
    key_contato_aluno						int											not null,
    
    foreign key (key_contato_aluno) references contato_do_aluno(codigo)
);


-- Tabela associativa entre alunos e turmas permitindo os alunos participar de mais de uma turma e uma turma ter mais de um aluno
create table aluno_turma (
	id										int											auto_increment,
    data_matricula							date										not null,
    
    key_aluno								int											not null,
    key_turma								int											not null,
    
    primary key(id, key_aluno, key_turma),
    
    foreign key(key_aluno) references aluno(rm),
    foreign key(key_turma) references turma(codigo)
);