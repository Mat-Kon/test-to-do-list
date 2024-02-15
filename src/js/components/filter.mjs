function filterTasks(filterValue) {
  const tasks = document.querySelectorAll('.card');
  tasks.forEach(task => {
      switch(filterValue) {
          case 'all':
              task.style.display = 'flex';
              break;
          case 'active':
              if (task.classList.contains('active')) {
                  task.style.display = 'flex';
              } else {
                  task.style.display = 'none';
              }
              break;
          case 'completed':
              if (task.classList.contains('completed')) {
                  task.style.display = 'flex';
              } else {
                  task.style.display = 'none';
              }
              break;
      }
  });
};

export { filterTasks }