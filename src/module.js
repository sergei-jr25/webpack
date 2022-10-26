console.log('module');


const start = async () => {
   return Promise.resolve('async working')
}

start().then(console.log)