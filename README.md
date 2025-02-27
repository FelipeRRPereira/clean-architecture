# DDD: Modelagem Tática e Patterns

### Introdução
Após aplicar os conceitos do DDD e suas técnicas de especificação de domínios, partimos para a parte tática da modelagem e para os padrões. A maioria começa pela parte tática e entende DDD como uma forma de escrever código, mas essa não é a proposta central da metodologia.

---

### Resignificação de conceitos
Uma história ilustra a forma como conceitos podem ser aprendidos sem compreensão real de suas motivações:

Um grupo de macacos é colocado em uma sala com uma escada e bananas no topo. Toda vez que um macaco sobe para pegar uma banana, os outros recebem um jato de água fria. Aos poucos, os macacos começam a impedir que qualquer um suba. Quando todos os macacos são substituídos, os novos continuam a impedir tentativas, mesmo sem nunca terem recebido o jato de água.

Isso demonstra que muitos conceitos que aplicamos na prática podem ter sido adotados sem compreensão real. O objetivo do curso é resignificar esses conceitos para que possamos aplicá-los de forma consciente e eficiente.

---

## Elementos Táticos
Os elementos táticos são padrões que nos ajudam a entender melhor os contextos delimitados do sistema, permitindo uma modelagem mais precisa dos componentes, comportamentos e relações.

### Entidades
> "Uma entidade é algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo." - Implementing Domain-Driven Design - Vernon

> "Uma entidade é algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independentemente dos atributos que são importantes para a aplicação do usuário." - Domain-Driven Design - Evans

Uma entidade possui identidade única, independentemente dos atributos. Por exemplo, várias pessoas podem ter os mesmos atributos (nome, idade), mas são entidades diferentes.

#### Criando entidade anêmica
Uma entidade anêmica é uma classe que possui apenas atributos, construtor e getters/setters, mas sem regras de negócio. Isso ocorre quando se cria entidades apenas para ORM, tornando-as semelhantes a DTOs.

#### Regras de negócio
Ao invés de getters e setters, o DDD recomenda criar métodos semânticos que reflitam as regras de negócio. Por exemplo, em vez de `setNome()`, usamos `alterarNome()`, garantindo que a lógica de negócio esteja embutida.

#### Consistência constante em primeiro lugar
Uma entidade deve estar sempre consistente após sua criação. Por exemplo, um cliente não pode existir sem um nome em nenhum momento.

#### Princípio de autovalidação
As entidades devem garantir sua própria validade e não permitir dados inválidos.

#### Entidade vs ORM
A entidade de negócio pertence à camada de Domínio, focada nas regras do sistema. A entidade do ORM pertence à camada de Infra, lidando com persistência.

---

### Value Objects
> "Quando você se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object." - Domain-Driven Design - Evans

> "Trate o Value Object como imutável." - Domain-Driven Design - Evans

Um Value Object é um objeto imutável que representa um conceito e não possui identidade própria. Por exemplo, um endereço pode ser representado por um Value Object, pois endereços iguais podem ser tratados como equivalentes.

O Value Object:
- Não tem ID.
- É imutável.
- É utilizado para representação e validação de dados.

---

### Aggregate
> "Um agregado é um conjunto de objetos associados que tratamos como uma unidade para propósito de mudança de dados." - Domain-Driven Design - Evans

Um aggregate é um grupo de objetos fortemente associados, com uma entidade principal chamada `Aggregate Root`.

Por exemplo, um cliente e seu endereço fazem parte do mesmo agregado. O cliente é a `Aggregate Root`, pois a entidade endereço não faz sentido fora do contexto do cliente.

Para definir um aggregate, deve-se identificar as informações que não dependem uma das outras para existir.

---

## Avançando com Testes

### Domain Services
> "Um serviço de domínio é uma operação sem estado que cumpre uma tarefa específica do domínio." - Implementing Domain-Driven Design - Vernon

> "Quando um processo ou transformação significativa no domínio não for responsabilidade natural de uma Entity ou Value Object, adicione uma operação ao modelo como um Serviço." - Domain-Driven Design - Evans

Os Domain Services são utilizados quando uma operação não se encaixa como método de uma entidade ou Value Object. Eles são:
- Independentes de estado.
- Relacionados a processos que envolvem várias entidades.

---

### Repositories
> "Um repositório comumente se refere a um local de armazenamento, geralmente considerado um local de segurança ou preservação dos itens nele armazenados." - Implementing Domain-Driven Design - Vernon

> "Esses objetos semelhantes a coleções são sobre persistência. Todo tipo Agregado persistente terá um Repositório." - Implementing Domain-Driven Design - Vernon

Os repositórios fornecem uma abstração da persistência, garantindo que as entidades sejam recuperadas e armazenadas sem que os detalhes da infraestrutura sejam expostos ao domínio.

Em resumo, os principais conceitos abordados incluem:
- **Entidades**: objetos com identidade única.
- **Value Objects**: objetos imutáveis sem identidade.
- **Aggregates**: conjuntos de entidades fortemente relacionadas.
- **Domain Services**: lógicas de domínio que não pertencem a uma entidade específica.
- **Repositories**: abstração da camada de persistência.

Esses elementos formam a base da modelagem tática do DDD.

