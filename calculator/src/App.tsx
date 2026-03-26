import "./App.css";
import { CalculatorBoard } from "./components/calculatorBoard";
import { Container } from "./components/container";

export default function App() {
  return (
    <>
      <Container>
        <CalculatorBoard />
      </Container>
    </>
  );
}
