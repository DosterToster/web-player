export default function Playlist() {
    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <div className="playlist-header">
                <span>Title</span>
                <span>Artist</span>
                <span>Duration</span>
            </div> 
            <ul>
                <li>
                    <span>K.</span>
                    <span>Cigarettes After Sex</span>
                    <span>5:20</span>
                </li>
                <li>
                    <span>Smile</span>
                    <span>Ashbury Heights</span>
                    <span>3:44</span>
                </li>
                <li>
                    <span>Goth</span>
                    <span>Sidewalks and Skeletons</span>
                    <span>3:27</span>
                </li>
            </ul>
        </div>
    )
}