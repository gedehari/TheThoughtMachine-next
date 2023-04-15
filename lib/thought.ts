import { supabase } from "./supabaseClient"

export interface ThoughtData {
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

export function getThoughts({ from, limit }: GetThoughtsProps): Promise<Array<ThoughtData>> {
  return new Promise<Array<ThoughtData>>((resolve, reject) => {
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

export function uploadThought(thought: ThoughtData) {
  return supabase.from("thoughts").insert({
    title: thought.title,
    content: thought.content
  })
}
