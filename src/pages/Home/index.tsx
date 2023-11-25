import { useForm } from 'react-hook-form'
import { Header } from '../../components/Header'
import { ItemProcess } from '../components/ItemProcess'
import { Input, ListProcess, MainContainer } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

const processFormValidation = zod.object({
  processName: zod.string().min(1, 'Informe o nome do Processo'),
  processSeconds: zod
    .number()
    .min(1, 'O Processo deverá ter no minimo 1 segundo')
    .max(60, 'O Processo deverá ter no máximo 60 segundo'),
})

type processFormData = zod.infer<typeof processFormValidation>

export function Home() {
  const processForm = useForm<processFormData>({
    resolver: zodResolver(processFormValidation),
    defaultValues: {
      processName: '',
    },
  })

  const { handleSubmit, register, reset } = processForm

  const [processData, setProcessData] = useState<processFormData[]>([])
  const [currentProcess, setCurrentProcess] = useState<processFormData | null>(
    null,
  )

  const processCount = processData.length

  function handleCreateNewProcess(data: processFormData) {
    const newProcess: processFormData = {
      processName: data.processName,
      processSeconds: data.processSeconds,
    }

    setProcessData((state) => [...state, newProcess])
    reset()
  }

  useEffect(() => {
    const sortedProcesses = [...processData].sort(
      (a, b) => a.processSeconds - b.processSeconds,
    )

    setCurrentProcess(sortedProcesses[0])
  }, [processData])

  // console.log(currentProcess)

  const [remainingTime, setRemainingTime] = useState(
    currentProcess?.processSeconds !== undefined
      ? currentProcess.processSeconds
      : 0,
  )

  useEffect(() => {
    if (currentProcess) {
      const totalTimeInSeconds = currentProcess.processSeconds
      let currentTime = 0

      const interval = setInterval(() => {
        currentTime += 1
        setRemainingTime((previousTime) => {
          if (currentTime >= totalTimeInSeconds) {
            clearInterval(interval)
            console.log('Tempo atingido!')
          }

          return previousTime + 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentProcess])

  console.log(remainingTime)

  return (
    <MainContainer>
      <Header />
      <Input onSubmit={handleSubmit(handleCreateNewProcess)}>
        <input
          placeholder="Adicione um Novo Processo"
          type="text"
          {...register('processName')}
        />
        <input
          placeholder="Tempo do Processo (Seg)"
          type="number"
          max={60}
          {...register('processSeconds', { valueAsNumber: true })}
        />
        <button type="submit">Criar</button>
      </Input>
      <ListProcess>
        <p>Processos criados</p>
        <span>{processCount}</span>
      </ListProcess>
      {processData.map((process) => {
        return (
          <ItemProcess
            key={process.processName}
            seconds={process.processSeconds}
            name={process.processName}
          />
        )
      })}
    </MainContainer>
  )
}
