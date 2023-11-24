import { Header } from '../../components/Header'
import { ItemProcess } from '../components/ItemProcess'
import { Input, ListProcess, MainContainer } from './styles'

export function Home() {
  return (
    <MainContainer>
      <Header />
      <Input>
        <input placeholder="Adicione um Novo Processo" type="text" />
        <input placeholder="Tempo do Processo (Seg)" type="number" />
        <button type="submit">Criar</button>
      </Input>
      <ListProcess>
        <p>Processos criados</p>
        <span>0</span>
      </ListProcess>
      <ItemProcess />
      <ItemProcess />
      <ItemProcess />
      <ItemProcess />
      <ItemProcess />
    </MainContainer>
  )
}
