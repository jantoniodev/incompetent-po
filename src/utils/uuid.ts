import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
)

export const generateUUID = (length = 22) => nanoid(length)