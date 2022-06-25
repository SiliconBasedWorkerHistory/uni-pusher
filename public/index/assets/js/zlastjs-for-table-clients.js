new Vue({
    el: '#wrapper',
    data: {
      clients:[]
    },
    methods: {
  
    },
    mounted() {
      let that = this;
  
      const axi = axios.create({
        baseURL: 'http://127.0.0.1:52100/api/admin',
        timeout: 1000
      });
  
    //   axi.post("/projects")
    //     .then(d => {
    //       that.proj_len = d.data.data.length;
    //     }).catch(e => {
    //       console.log(e);
    //     });
      axi.post("/clients")
        .then(d => {
          that.clients = d.data.data;
        }).catch(e => {
          console.log(e);
        });
    //   axi.post("/socket/count").then(d => {
    //     console.log(d);
    //     that.soc_len = d.data.data.count;
    //   }).catch(e => {
    //     console.log(e);
    //   });
    }
  });