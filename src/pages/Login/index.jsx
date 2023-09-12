import { message } from "antd";
import { login } from "../../lib/api"
import { PageContext } from "../../lib/PageContext";
import { auth } from "../../lib/services";
import LoginView from "./view";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const alert = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

    const handleSubmit = async(e) => {
      const payload = {
        email: e.email,
        password: e.password,
      };
      try {
        alert('warning', "Logging In")
        const data = await login(payload)
        if(data.data.token){
          auth.storeToken(data.data.token)
          window.location.href = "/dashboard"
        }else{
          alert('warning', data.data)
        }
      } catch (error) {
        alert('warning',error.response.data.data)
      }
    };
    const values = {
      handleSubmit,
      contextHolder
    };
    return (
      <PageContext.Provider value={values}>
        <LoginView />
      </PageContext.Provider>
    );
};
  
  export default Login;
  