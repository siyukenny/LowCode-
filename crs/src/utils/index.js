export function LINK_JUMP(link) {
  const { link_id, link_type, link_url } = link // eslint-disable-line

  if (link_url) { // eslint-disable-line
    window.open(link_url)
  }
}
