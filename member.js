function skillsMember() {
  // ...
  this.skills = ['JavaScript', 'React', 'Node', 'HTML', 'CSS'];
  this.showSkills = function() {
    this.skills.forEach(function(skill) {
      console.log(skill);
    });
  };
}
