// import { ColumnProps } from '@/store'

interface CheckCondition {
    format?: string [];
    size?: number;
}

type ErrorType = 'size' | 'format' | null

export const beforeUploadCheck = (file: File, condition: CheckCondition) => {
  const {
    format,
    size
  } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValideSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValideSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValideSize,
    error
  }
}
