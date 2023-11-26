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
  const [currentDateProcess, setCurrentDateProcess] = useState<Date | null>(
    null,
  )
  const [readyQueue, setReadyQueue] = useState<Process[]>([])

  const processCount = processData.length

  function handleCreateNewProcess(data: processFormData) {
    const newProcess: Process = {
      id: new Date().getTime().toString(),
      processName: data.processName,
      processSeconds: data.processSeconds,
    }

    setProcessData((state) => [...state, newProcess])

    if (!currentProcess) {
      setCurrentDateProcess(new Date())
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

    if (!currentProcess) {
      if (sortedProcesses.length > 0) {
        setCurrentProcess(sortedProcesses[0])
      } else {
        setCurrentProcess(null)
      }
    }
  }, [currentDateProcess, currentProcess, readyQueue])

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
    if (currentProcess && currentDateProcess) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          currentDateProcess,
        )
        if (secondsDifference >= currentProcess.processSeconds) {
          markCurrentProcessAsFinished()
          if (readyQueue.length > 0) {
            const nextProcess = readyQueue[0]
            setCurrentProcess(nextProcess)
            setCurrentDateProcess(new Date())
            setReadyQueue((queue) => queue.slice(1))
          } else {
            setCurrentProcess(null)
          }
        }
        console.log(currentDateProcess)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
      console.log('cheguei')
    }
  }, [
    currentDateProcess,
    currentProcess,
    markCurrentProcessAsFinished,
    readyQueue,
  ])

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
