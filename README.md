# 📚 Clean Architecture — Um Guia Prático

## 🧠 Origem

O termo **Clean Architecture** foi cunhado por **Robert C. Martin (Uncle Bob)** em **2012**. Desde então, tornou-se uma buzzword no mundo da arquitetura de software. A proposta surgiu como uma evolução da **Arquitetura Hexagonal**, com mais detalhes sobre separação de responsabilidades, proteção de domínio e organização baseada em **casos de uso**.

> "Clean Architecture é uma variação da Hexagonal Architecture trazendo mais detalhes."

## 💡 Por Que Ler o Livro *Clean Architecture*?

Apesar de tratar especificamente da Clean Architecture em apenas 7 páginas, o livro é uma excelente oportunidade para:

- **Refinar o conhecimento** sobre arquitetura.
- **Eliminar gaps** fundamentais que muitas vezes passam despercebidos.
- **Revisar conceitos de componentes, limites arquiteturais e regras de negócio.**
- **Beber direto da fonte**, entendendo a visão do próprio Uncle Bob.

> “The strategy behind that facilitation is to leave as many options open as possible, for as long as possible.” – *Robert C. Martin*

> “O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema. Uma boa arquitetura torna o sistema fácil de entender, desenvolver, manter e implantar. O objetivo final é minimizar o custo de vida útil do sistema e maximizar a produtividade do programador.” – *Robert C. Martin*

## 🔄 Princípios Fundamentais

### 🧱 Regras vs. Detalhes

- As **regras de negócio** são o coração do sistema.
- **Detalhes (frameworks, banco de dados, APIs, etc.)** devem ser periféricos.
- As regras **não podem depender** de detalhes de implementação.
- Devemos ser capazes de visualizar as regras **sem acoplamento aos detalhes.**

### 🔓 Keep Options Open

- Arquitetura deve manter **opções em aberto** pelo maior tempo possível.
- O sistema precisa ser **adaptável** a mudanças, com o core protegido.

## 🎯 Use Cases

### Função

- Expressam **intenção** e **clareza** sobre o comportamento do sistema.
- Contam **uma história**, com fluxo bem definido de execução.
- Interagem com camadas externas apenas através de **abstrações**.

### SRP (Single Responsibility Principle)

- Cada caso de uso deve mudar por **um único motivo**.
- Mesmo que parecidos (ex: Inserir vs Alterar), **não devem ser reutilizados**.
- Duplicações podem ser:
  - **Reais**: código idêntico e sem variação — podem ser unificados.
  - **Acidentais**: aparentam ser iguais, mas pertencem a contextos diferentes — **devem ser mantidos separados**.

### Contando uma História

- Use Cases representam uma **sequência lógica** que expressa o core de uma funcionalidade.
- Devem se comunicar com outras camadas apenas por **interfaces**, para manter a **independência dos detalhes de implementação**.

## 🧱 Limites Arquiteturais

- Tudo que **não altera diretamente a regra de negócio** deve estar fora do núcleo da aplicação.
- O **frontend**, o **banco de dados** ou qualquer tecnologia externa **não dita as regras de negócio**.

### Input vs Output

- Os dados **entram** na aplicação, percorrem as camadas até o núcleo, são processados e depois **retornam**.
- É essencial **respeitar o fluxo** e os **limites arquiteturais**.

## 📦 DTO (Data Transfer Object)

- Serve para **trafegar dados** entre os limites arquiteturais.
- São **anêmicos**, sem lógica ou comportamento.
- Usados tanto para **input** quanto **output**.
- Não possuem nenhuma **regra de negócio**.
- Controller recebe input, cria um DTO.
- Use Case processa a lógica, retorna um DTO de output.
- Presenter transforma o DTO para o formato de saída.

## 🎨 Presenters

- Responsáveis por **formatar o retorno** (ex: JSON, XML, GraphQL, CLI).
- Adequam o DTO de output para a **interface correta de entrega**.
- Um sistema pode ter múltiplos formatos de entrega — o Presenter cuida dessa transformação.

## 🧬 Entities

- **Entities na Clean Architecture ≠ Entities no DDD**.
- Na Clean Architecture, representam o **core de regras de negócio**.
- Não possuem forma rígida. Podem ser:
  - **Agregados**
  - **Serviços de domínio**
- **Táticas do DDD** ajudam a estruturá-las, mas a Clean Architecture não impõe isso.
- Entities devem ser **independentes de frameworks ou tecnologia**.

## 📚 Referências

- Livro: *Clean Architecture*, Robert C. Martin
- Artigo original: [The Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
