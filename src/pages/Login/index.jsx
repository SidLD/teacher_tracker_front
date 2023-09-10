import { message } from "antd";
import { login } from "../../lib/api"
import { PageContext } from "../../lib/PageContext";
import { auth } from "../../lib/services";
import LoginView from "./view";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async(e) => {
      const payload = {
        schoolId: e.schoolId,
        password: e.password,
      };
      try {
        const data = await login(payload)
        if(data.data.token){
          auth.storeToken(data.data.token)
          window.location.href = "/dashboard"
        }else{
          warning(data.data)
        }
      } catch (error) {
        warning(error.response.data.data)
      }
    };
    const warning = (data) => {
      messageApi.open({
        type: 'warning',
        content: data,
      });
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
  