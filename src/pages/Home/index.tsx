import { useForm } from 'react-hook-form'
import { Header } from '../../components/Header'
import { ItemProcess } from '../components/ItemProcess'
import { Input, ListProcess, MainContainer } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const processFormValidation = zod.object({
  processName: zod.string().min(1, 'Informe o nome do Processo'),
  processSeconds: zod
    .number()
    .min(1, 'O Processo deverá ter no minimo 1 segundo')
    .max(60, 'O Processo deverá ter no máximo 60 segundo'),
})

type processFormData = zod.infer<typeof processFormValidation>

interface Process {
  id: string
  processName: string
  processSeconds: number
  startDate: Date
  finishedDate?: Date
}

export function Home() {
  const processForm = useForm<processFormData>({
    resolver: zodResolver(processFormValidation),
    defaultValues: {
      processName: '',
    },
  })

  const { handleSubmit, register, reset } = processForm

  const [processData, setProcessData] = useState<Process[]>([])
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null)
  const [readyQueue, setReadyQueue] = useState<Process[]>([])

  const processCount = processData.length

  function handleCreateNewProcess(data: processFormData) {
    const newProcess: Process = {
      id: new Date().getTime().toString(),
      processName: data.processName,
      processSeconds: data.processSeconds,
      startDate: new Date(),
    }

    setProcessData((state) => [...state, newProcess])

    if (!currentProcess) {
      setCurrentProcess(newProcess)
    } else {
      setReadyQueue((queue) =>
        [...queue, newProcess].sort(
          (a, b) => a.processSeconds - b.processSeconds,
        ),
      )
    }

    reset()
  }

  useEffect(() => {
    const sortedProcesses = [...readyQueue].sort(
      (a, b) => a.processSeconds - b.processSeconds,
    )

    if (sortedProcesses.length > 0) {
      setCurrentProcess(sortedProcesses[0])
    } else {
      setCurrentProcess(null)
    }
  }, [readyQueue])

  const markCurrentProcessAsFinished = useCallback(() => {
    if (currentProcess) {
      setProcessData((state) =>
        state.map((process) => {
          if (currentProcess && currentProcess.id === process.id) {
            return { ...process, finishedDate: new Date() }
          } else {
            return process
          }
        }),
      )
    }
  }, [currentProcess, setProcessData])

  useEffect(() => {
    let interval: number

    if (currentProcess) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          currentProcess.startDate,
        )

        if (secondsDifference >= currentProcess.processSeconds) {
          markCurrentProcessAsFinished()

          if (readyQueue.length > 0) {
            const nextProcess = readyQueue[0]
            setCurrentProcess(nextProcess)
            setReadyQueue((queue) => queue.slice(1))
          } else {
            setCurrentProcess(null)
          }
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [currentProcess, markCurrentProcessAsFinished, readyQueue])

  console.log(readyQueue)

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
            finishedDate={process.finishedDate}
          />
        )
      })}
    </MainContainer>
  )
}
