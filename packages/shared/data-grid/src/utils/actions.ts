import type { Column } from '../types'
import type { User } from '../types/user'

/**
 * Fetch columns from the API
 * @returns {Column[]} columns value
 */
export const fetchColumns = async (): Promise<Column[]> => {
  const response = await fetch('/api/data')
  return await await response.json()
}

/**
 * Fetch users from the API
 * @returns {User[]} users value
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users')
  return await await response.json()
}

/**
 * Update columns in the API
 * @param {Column[]} columns - New columns value
 * @returns {Column[]} columns value
 */
export const updateColumns = async (columns: Column[]): Promise<Column[]> => {
  const response = await fetch('/api/data', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(columns),
  })
  return await response.json()
}

/**
 * Reset columns in the API to default dataset or large dataset
 * @param {string} size - Size of the dataset
 * @returns {Column[]} columns value
 */
export const resetAPIColumns = async ({
  size,
}: {
  size: 'large' | 'default'
}): Promise<Column[]> => {
  const response = await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ size }),
  })
  return await response.json()
}
