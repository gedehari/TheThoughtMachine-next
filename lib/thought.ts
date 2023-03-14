import { supabase } from "./supabaseClient"

export interface Thought {
  id?: number
  title: string
  content: string
  fromOwner?: boolean
  createdAt?: Date | string
}

interface GetThoughtsProps {
  from?: number,
  limit?: number
}

export function getThoughts({ from, limit }: GetThoughtsProps): Promise<Array<Thought>> {
  return new Promise<Array<Thought>>((resolve, reject) => {
    supabase.from("thoughts")
      .select()
      .order("id", { ascending: false })
      .then((value) => {
        if (value.data) {
          resolve(value.data.map((value) => {
            return {
              id: value.id,
              title: value.title,
              content: value.content,
              fromOwner: value.from_owner,
              createdAt: new Date(value.created_at)
            }
          }))
        }
        else {
          reject()
        }
      })
  })
}

export function uploadThought(thought: Thought) {
  return supabase.from("thoughts").insert({
    title: thought.title,
    content: thought.content
  })
}
