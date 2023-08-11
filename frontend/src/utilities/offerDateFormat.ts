function offerDateFormat(dateString: string): string {
    const date = new Date(dateString);
    let month;
    switch (date.getMonth() + 1) {
        case 1:
            month = 'stycznia';
            break;
        case 2:
            month = 'lutego';
            break;
        case 3:
            month = 'marca';
            break;
        case 4:
            month = 'kwietnia';
            break;
        case 5:
            month = 'maja';
            break;
        case 6:
            month = 'czerwca';
            break;
        case 7:
            month = 'lipca';
            break;
        case 8:
            month = 'sierpnia';
            break;
        case 9:
            month = 'września';
            break;
        case 10:
            month = 'października';
            break;
        case 11:
            month = 'listopada';
            break;
        case 12:
            month = 'grudnia';
            break;
    }

    if (date.toDateString() === new Date().toDateString()) {
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    }
    else {
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }
}

export default offerDateFormat;