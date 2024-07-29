interface AcceptanceCriteria {
    business: string[];
    technical: string[];
}

export interface UserStory {
    id: number;
    title: string;
    story: string;
    description: string;
    acceptanceCriteria: AcceptanceCriteria;
}
