function addManyBackgrounds(string[] calldata _backgrounds) external override onlyOwner whenPartsNotLocked {
    art.addManyBackgrounds(_backgrounds);
}