import type { ISkillsMap } from '@/types.ts'
import { basename, dirname, resolve } from 'node:path'
import { sanitizeName } from '@/utils.ts'

export const formattingSkills = (skills: Map<string, Set<string>>): ISkillsMap => {
    const skillsArray = Array.from(skills.entries())
        .map(([skill, path]) => {
            const items = Array.from(path).map((p) => {
                const __dirname = dirname(p)
                const agentRoot = resolve(__dirname, '../..')
                const agent = sanitizeName(basename(agentRoot))
                return {
                    agent,
                    agentPath: agentRoot,
                    dirname: __dirname,
                    skillDir: resolve(__dirname, '../'),
                    skillMdPath: p,
                }
            })

            return [skill, items] as const
        })

    return Object.fromEntries(skillsArray)
}
