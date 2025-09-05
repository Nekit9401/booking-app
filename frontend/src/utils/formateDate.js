export const formateDate = (date) => {
	if (!date) return null;
	return new Date(date).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};
