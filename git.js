(function () {
  /**
   * Commit classe
   * Um único commit.
   *
   * @param {number} id  		 ID do commit.
   * @param {Commit} parent	 Parent Commit.
   * @param {string} msg 		 Mensagem de commit.
   */
  function Commit(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
  }

  /**
   * Branch class.
   * A Branch.
   * @param {string} name 	Nome da branch.
   * @param {number} commit   Commit it points to.
   */
  function Branch(name, commit) {
    this.name = name;
    this.commit = commit;
  }

  /**
   * Git classe
   * Representa um repositório Git.
   *
   * @param {string} name Nome do repositorio.
   */
  function Git(name) {
    this.name = name; // Repo name
    this.lastCommitId = -1; // Acompanhe o último ID de commit.
    this.branches = []; // Lista todas as branchs.

    var master = new Branch("master", null); // Nenhum commit ainda, então null foi passado.
    this.branches.push(master); // Store master branch.

    this.HEAD = master; // HEAD aponta para o branch atual.
  }

  /**
   * Faca o commit.
   * @param  {string} message Commit message.
   * @return {Commit}        Objeto de commit criado.
   */
  Git.prototype.commit = function (message) {
    // Incrementa o último ID de commit e passa para o novo commit.
    var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

    // Atualiza o ponteiro da branch atual para um novo commit.
    this.HEAD.commit = commit;

    return commit;
  };

  /**
   * Checkout da branch ou cria uma caso ela nao exista.
   *
   * @param  {string} branchName Branch para mudar ou criar
   * @return {Branch}           Branch atual apos o checkout.
   */
  Git.prototype.checkout = function (branchName) {
    // Faz um loop por todas as ramificações e vê se temos uma ramificação
    // chamado `branchName`.
    for (var i = this.branches.length; i--; ) {
      if (this.branches[i].name === branchName) {
        // Procura uma branch existente
        console.log("Switched to existing branch: " + branchName);
        this.HEAD = this.branches[i];
        return this;
      }
    }

    // Se a branch não for encontrada, crie uma nova.
    var newBranch = new Branch(branchName, this.HEAD.commit);
    // Store branch.
    this.branches.push(newBranch);
    // Atualiza o HEAD
    this.HEAD = newBranch;

    console.log("Switched to new branch: " + branchName);
    return this;
  };

  /**
   * Historico de Logs.
   * @return {Array} Confirma em ordem cronológica inversa.
   */
  Git.prototype.log = function () {
    // Comeca pelo HEAD do commit
    var commit = this.HEAD.commit,
      history = [];

    while (commit) {
      history.push(commit);
      // Keep following the parent
      commit = commit.parent;
    }

    return history;
  };

  // Exibe a classe Git na janela.
  window.Git = Git;
})();
