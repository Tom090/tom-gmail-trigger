export type parsedBody = {
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
    headers: Header[];
};
export type Header = {
    name: string;
    value: string;
};
//# sourceMappingURL=header.d.ts.map