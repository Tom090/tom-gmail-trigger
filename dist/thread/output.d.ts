export type ThreadOutput = {
    id: string;
    threadId: string;
    labelIds: [];
    from: {
        name: string;
        email: string;
    };
    to: [
        {
            name: string;
            email: string;
        }
    ];
    cc: [];
    bcc: [];
    body_text: string;
    body_html: string;
    subject: string;
};
//# sourceMappingURL=output.d.ts.map