function getData() {
  setTimeout(() => {
    console.log('1. First thing setting up second thing');
    setTimeout(() => {
      console.log('2. Second thing setting up third thing');
      setTimeout(() => {
        console.log('3. Third thing setting up fourth thing');
        setTimeout(() => {
          console.log('4. Fourth thing');
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}

getData();
