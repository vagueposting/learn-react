import './App.css'
import { CalculatorButton } from './components/calcButton'
import { CalculatorBoard } from './components/calculatorBoard'
import { Container } from './components/container'

export default function App() {
  return (
    <>
      <Container>
        <CalculatorBoard>
          <CalculatorButton num={1} type='NUMBER'/>
          <CalculatorButton num={2} type='NUMBER' />
        </CalculatorBoard>
      </Container>
    </>
  )
}