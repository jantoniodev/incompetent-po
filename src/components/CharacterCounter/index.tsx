'use client'

export interface CharacterCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    current: number
    max?: number
}

export const CharacterCounter = ({
    current,
    max,
    ...parameters
}: CharacterCounterProps) => {
    return (
        <div {...parameters}>
            <span>{current}</span>
            {max && <span>/{max}</span>}
        </div>
    )
}