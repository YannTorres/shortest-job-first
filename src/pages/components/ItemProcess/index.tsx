import { ItemProcessContainer, ProcessStatus } from './styles'

export function ItemProcess() {
  return (
    <ItemProcessContainer>
      <h2>Nome do Processo:</h2>
      <p>Inicializar o Windows</p>
      <h2>Tempo do Processo:</h2>
      <p>
        <span>30</span> Segundos
      </p>
      <ProcessStatus variant="verde">
        <span>Em andamento</span>
      </ProcessStatus>
    </ItemProcessContainer>
  )
}
