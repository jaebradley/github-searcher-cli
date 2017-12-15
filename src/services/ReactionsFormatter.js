class ReactionsFormatter {
  static formatReactions(reactions) {
    if (!reactions) {
      return '';
    }

    const thumbsUps = reactions['+1'];
    const thumbsDowns = reactions['-1'];
    const laughs = reactions.laugh;
    const hoorays = reactions.hooray;
    const confusedFaces = reactions.confused;
    const hearts = reactions.heart;

    const formattedReactions = [];

    if (thumbsUps > 0) {
      formattedReactions.push(`👍  ${thumbsUps}`);
    }

    if (thumbsDowns > 0) {
      formattedReactions.push(`👎  ${thumbsDowns}`);
    }

    if (laughs > 0) {
      formattedReactions.push(`😁  ${laughs}`);
    }

    if (hoorays > 0) {
      formattedReactions.push(`🎉  ${hoorays}`);
    }

    if (confusedFaces > 0) {
      formattedReactions.push(`😕  ${confusedFaces}`);
    }

    if (hearts > 0) {
      formattedReactions.push(`❤️  ${hearts}`);
    }

    return formattedReactions.join(' |  ');
  }
}


export default ReactionsFormatter;
