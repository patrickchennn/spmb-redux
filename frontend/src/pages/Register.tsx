import React,{useState,useRef,useEffect} from 'react';
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import RegisterLoginNav from '../components/RegisterLoginNav';
import ArtPaintLg from '../assets/art-paint-lg.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {register,reset} from "../features/auth/authSlice";
import { useAppDispatch,useAppSelector } from '../app/hooks';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  // select a state namely "auth"
  const {user,isLoading,isError,isSuccess,message} = useAppSelector(state => {
    console.log(state);
    return state.auth;
  });

  // if the confirmation password reference DOM
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  // user data form
  interface UserData {
    name: string,
    email: string,
    password:string,
    confirmPassword:string,
  }
  const [userData,setUserData] = useState<UserData>({
    name:"",email:"",password:"",confirmPassword:""
  });

  const {name,email,password,confirmPassword} = userData;

  useEffect(() => {
    // console.log("USE EFFECT!")
    if(isError) toast.error(message);
    
    if(isSuccess || user) navigate('/spmb-form')

    dispatch(reset())
  }, [user,isLoading,isError,isSuccess,message,navigate,dispatch])
  



  function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    // if the first password and the confirmation password is equal
    if(userData.password===userData.confirmPassword){
      console.log("user data to be submitted:\n", userData);
      dispatch(register({name,email,password}));
    }
    // if not equal(else)
    else{
      // show error message
      toast.error("Initial and confirm password are different!",{
        autoClose: 8000
      });
      // console.log(confirmPasswordRef.current!);
      // point the confirmation password form and clear it
      confirmPasswordRef.current!.value = "";
      confirmPasswordRef.current!.focus();

    }
  }

  function handleChange(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement;
    const targetId: string = target.id;
    setUserData(prev => ({
      ...prev,
      [targetId]: target.value,
    }))
  }






  // view
  if(isLoading){
    return <h1>loading...</h1>
  }

  return (
    <div className=" d-flex align-items-center" style={{
      height:"600px",
      backgroundImage:`url("${ArtPaintLg}")`,
      backgroundSize: "cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
    }}>

      <Container>
        <Row className="p-sm-0 py-5 px-3">
          <Col className="d-sm-block d-none">
            {/* can put product,hero,logo,or anything in here... */}
          </Col>
          <Col className="px-3 py-4" style={{
            borderRadius:"10px",
            backgroundColor:"white",
            boxShadow:"0px 0px 5px black",
          }}>
            <Form onSubmit={handleSubmit}>
              <RegisterLoginNav />

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={name} onChange={handleChange} placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" value={email} onChange={handleChange} placeholder="example@mail.com" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" value={password} onChange={handleChange} placeholder="Enter your password"/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control ref={confirmPasswordRef} required type="password" value={confirmPassword} onChange={handleChange} />
              </Form.Group>

              <div className="d-flex justify-content-end gap-3">
                <Button variant="warning" type="reset">
                  Clear Form
                </Button>
                <Button variant="info" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;