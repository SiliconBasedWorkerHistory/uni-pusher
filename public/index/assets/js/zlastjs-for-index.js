new Vue({
  el: '#wrapper',
  data: {
    proj_len: 0,
    clie_len: 0,
    soc_len: 0,
    pu_len:100,
    oclie_len:11,
    usr_len:120,
    log_len:1200,
    up_time:"100h40min"
  },
  methods: {
    ms13ToHMS:(t)=>{
      return moment.duration(t).humanize() 
    }
  },
  mounted() {
    let that = this;

    const axi = axios.create({
      baseURL: 'http://127.0.0.1:52100/api/admin',
      timeout: 1000
    });

    axi.post("/projects")
      .then(d => {
        that.proj_len = d.data.data.length;
      }).catch(e => {
        console.log(e);
      });
    axi.post("/clients")
      .then(d => {
        that.clie_len = d.data.data.length;
      }).catch(e => {
        console.log(e);
      });
    axi.post("/users")
      .then(d=>{
        that.usr_len = d.data.data.length;
      }).catch(e => {
        console.log(e);
      });
    axi.post("/socket/count").then(d => {
      that.soc_len = d.data.data.count;
    }).catch(e => {
      console.log(e);
    });
    axi.get("/uptime").then(d=>{
      that.up_time = that.ms13ToHMS(Date.now() - d.data.uptime);
    }).catch(e => {
      console.log(e);
    });
  }
});