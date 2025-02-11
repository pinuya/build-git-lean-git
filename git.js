function Git(name) {
  this.name = name; // Repo name
}

var repo = new Git("my-repo");

// Actual command:
// > git init

function Commit(id) {
  this.id = id;
  // Assume that 'this' has a 'change' property too.
}

function Commit(id, message) {
  this.id = id;
  this.message = message;
}

Git.prototype.commit = function (message) {
  var commit = new Commit();
  return commit;
};
