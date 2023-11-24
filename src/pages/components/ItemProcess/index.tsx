import { ItemProcessContainer, ProcessStatus } from './styles'

interface ProcessProps {
  name: string
  seconds: number
}

export function ItemProcess({ name, seconds }: ProcessProps) {
  return (
    <ItemProcessContainer>
      <h2>Nome do Processo:</h2>
      <p>{name}</p>
      <h2>Tempo do Processo:</h2>
      <p>
        <span>{seconds}</span> Segundos
      </p>
      <ProcessStatus variant="vermelho">
        <span>Na Fila</span>
      </ProcessStatus>
    </ItemProcessContainer>
  )
}
