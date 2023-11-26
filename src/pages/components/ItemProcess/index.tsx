import { ItemProcessContainer, ProcessStatus } from './styles'

interface ProcessProps {
  name: string
  seconds: number
  finishedDate?: Date
}

export function ItemProcess({ name, seconds, finishedDate }: ProcessProps) {
  return (
    <ItemProcessContainer>
      <h2>Nome do Processo:</h2>
      <p>{name}</p>
      <h2>Tempo do Processo:</h2>
      <p>
        <span>{seconds}</span> Segundos
      </p>
      {finishedDate && (
        <ProcessStatus variant="verde">
          <span>Concluído</span>
        </ProcessStatus>
      )}
      {!finishedDate && (
        <ProcessStatus variant="vermelho">
          <span>Na Fila</span>
        </ProcessStatus>
      )}
    </ItemProcessContainer>
  )
}
