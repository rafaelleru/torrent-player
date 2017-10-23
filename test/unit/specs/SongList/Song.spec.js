// import Vue from 'vue'
import Song from '@/components/SongList/Song'

describe('Song.vue', () => {
  it('has the requestPlay method', () => {
    expect(Song.methods).to.be.a('object')
  })

  it('has the properties torrent, title, index', () => {
    expect(Song.props).to.be.a('array')
    expect(Song.props).to.contain('title')
    expect(Song.props).to.contain('torrent')
    expect(Song.props).to.contain('index')
  })

  it('it is not playing', () => {
    var data = Song.data()
    expect(data).to.be.a('object')
    expect(data['play']).to.be.false
  })
})
