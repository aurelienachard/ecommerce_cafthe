import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// fonction qui permet de réinitialiser jsdom, qui simule le navigateur

afterEach(() => {
  cleanup()
})