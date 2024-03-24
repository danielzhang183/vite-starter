export interface Team {
  github: string
  display: string
}

export const teamMembers = [
  {
    github: 'danielzhang183',
    display: 'Daniel Zhang',
  },
].sort(() => Math.random() - 0.5)
