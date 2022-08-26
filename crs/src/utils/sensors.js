import sensors from '../lib/sensorsdata.es6.min'
let sersorsLoad = () => {
  sensors.init({
    server_url: 'https://fc.datasink.sensorsdata.cn/sa?project=default&token=3d302d5d57248935',
    use_client_time:true,
    send_type: 'beacon'
  });
  return sensors
}
export default sersorsLoad
