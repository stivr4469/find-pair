from storage.models import Article, Source


def test_article_has_channel_field():
    a = Article(url="http://test.com", title="Test", channel="tourism")
    assert a.channel == "tourism"


def test_source_has_channel_field():
    s = Source(name="Test Source", feed_url="http://test.com/rss", region="spain", channel="tourism")
    assert s.channel == "tourism"


def test_article_default_channel_is_news():
    a = Article(url="http://test2.com", title="Test2")
    assert a.channel == "news"
