export const getUserInitial = (name: string) => {
    const splitName = name.split(" ")
    return splitName[0].charAt(0) + splitName[1].charAt(0)
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};