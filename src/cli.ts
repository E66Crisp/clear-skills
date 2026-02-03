import type { IAgentType, IConfig } from '@/types.ts'
import { join } from 'node:path'
import { defineCommand, runMain } from 'citty'
import { glob } from 'glob'
import { resolveConfig } from '@/config.ts'
import { description, name, version } from '../package.json'

const getSkillPath = (config: IConfig, agentType: IAgentType): string => {
    const agent = config.agents[agentType]

    return config.global
        ? agent.globalSkillsDir
        : join(config.cwd, agent.skillsDir)
}

const main = defineCommand({
    meta: {
        name,
        version,
        description,
    },
    args: {
        global: {
            type: 'boolean',
            description: 'Global option',
            alias: 'g',
            default: false,
        },
    },
    setup() {
        console.log('welcome use clear skill cli tool')
    },
    async run({ args }) {
        const config = resolveConfig(args)

        for (const agent of Object.keys(config.agents) as IAgentType[]) {
            const agentDir = getSkillPath(config, agent)
            // console.log(agent, agentDir);
            const skills = await glob(`${agentDir}/**/SKILL.md`)
            if (skills.length) {
                console.log(skills)
            }
        }
    },
})

await runMain(main)
