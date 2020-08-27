module.exports = (data) => {
    let newData = {...data}
    delete newData.createdAt
    delete newData.updatedAt

    return newData
}