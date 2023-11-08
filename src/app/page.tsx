import FormWrap from "./components/FormWrap";
import Container from "./components/Container";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  )
}
